"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

interface CustomerContextValue {
  customer: Customer | null;
  loading: boolean;
  register: (data: { fullName: string; email: string; phone?: string; password?: string }) => Promise<Customer | null>;
  login: (data: { email: string; password?: string }) => Promise<Customer | null>;
  logout: () => void;
  update: (patch: Partial<Customer>) => void;
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("gmw_customer");
      if (raw) {
        setCustomer(JSON.parse(raw));
      }
    } catch (e) {
      console.warn("Failed to read customer from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (customer) {
      localStorage.setItem("gmw_customer", JSON.stringify(customer));
    } else {
      localStorage.removeItem("gmw_customer");
    }
  }, [customer]);

  const register = async (data: { fullName: string; email: string; phone?: string; password?: string }) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", ...data }),
      });
      if (!res.ok) throw new Error("registration failed");
      const json = await res.json();
      setCustomer(json.user);
      return json.user as Customer;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const login = async (data: { email: string; password?: string }) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", ...data }),
      });
      if (!res.ok) throw new Error("login failed");
      const json = await res.json();
      setCustomer(json.user);
      return json.user as Customer;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const logout = () => {
    setCustomer(null);
  };

  const update = (patch: Partial<Customer>) => {
    setCustomer((c) => (c ? { ...c, ...patch } : c));
  };

  return (
    <CustomerContext.Provider value={{ customer, loading, register, login, logout, update }}>
      {children}
    </CustomerContext.Provider>
  );
};

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used within CustomerProvider");
  return ctx;
}

export default CustomerContext;

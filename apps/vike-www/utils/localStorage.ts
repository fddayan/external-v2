import { useState } from "react";
import * as env from "./env";
// A miniature wrapper around local storage so that we're only using it if it exists

// there are at least two places browsers were throw if local-storage is disabled:
// 1. when you dereference window.localStorage
// 2. when you call a method on localStorage

let localStorage: typeof window.localStorage | null;
try {
  localStorage = window.localStorage;
} catch (e) {
  localStorage = null;
}

export const LocalStorageWrapper = {
  setItem(key: string, value: string): void {
    try {
      localStorage?.setItem(key, value);
    } catch (e) {
      if (env.isProduction()) return;
      throw e;
    }
  },

  getItem(key: string): string | null {
    try {
      return localStorage?.getItem(key);
    } catch (e) {
      if (env.isProduction()) return;
      throw e;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage?.removeItem(key);
    } catch (e) {
      if (env.isProduction()) return;
      throw e;
    }
  },

  clear(): void {
    try {
      localStorage?.clear();
    } catch (e) {
      if (env.isProduction()) return;
      throw e;
    }
  },

  disable(reason?: string): void {
    try {
      localStorage = null;
      window.localStorage.setItem = () => {
        console.log(reason || "localstorage has been disabled");
      };
    } catch (e) {
      if (env.isProduction()) return;
      throw e;
    }
  },
};

"use client";
import Provider from "@components/Provider";
import { ThemeProvider } from "next-themes";
import React from "react";

function provider() {
  return (
    <div>
      <ThemeProvider/>
        <Provider/>
    </div>
  );
}

export default provider;

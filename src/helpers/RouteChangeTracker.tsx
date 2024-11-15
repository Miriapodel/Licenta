"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeTracker() {
    const pathName = usePathname()

    useEffect(() => {
        if (pathName && !pathName.endsWith("/login") && !pathName.endsWith("/signup")) {
            localStorage.setItem("lastPage", pathName);
        }

    }, [pathName]);

    return null;
}
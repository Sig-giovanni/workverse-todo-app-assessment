import { fileURLToPath } from "url";
import createJITI from "jiti";
const jiti = createJITI(fileURLToPath(import.meta.url));

// jiti("./env");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

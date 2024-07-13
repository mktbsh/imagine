import { serve } from "@hono/node-server";
import { createApp } from "./src/app";

serve(createApp());

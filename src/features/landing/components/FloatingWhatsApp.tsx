"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/shared/components/ui/neon-button";
import { MessageSquare } from "lucide-react";
export const FloatingWhatsApp = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 inset-e-8 z-100"
    >
      <a
        href="https://wa.me/201009911934"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="solid"
          size="lg"
          className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center p-0"
        >
          <MessageSquare size={32} />
        </Button>
      </a>
    </motion.div>
  );
};
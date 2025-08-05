import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TriangleAlertIcon, AlertCircleIcon, InfoIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface WarningProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  details?: string[];
}

const Warning: React.FC<WarningProps> = ({
  isOpen,
  onClose,
  type = 'warning',
  title,
  message,
  details = []
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />;
      case 'info':
        return <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#FFE0C2]" aria-hidden="true" />;
      default:
        return <TriangleAlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#FFE0C2]" aria-hidden="true" />;
    }
  };

  const getContainerClasses = () => {
    const baseClasses = "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm";
    return baseClasses;
  };

  const getModalClasses = () => {
    const baseClasses = "relative w-full max-w-md mx-4 bg-[#171717] rounded-lg shadow-lg border";
    const typeClasses = {
      warning: "border-[#FFE0C2]/30",
      error: "border-red-400/30",
      info: "border-[#FFE0C2]/30"
    };
    return cn(baseClasses, typeClasses[type]);
  };

  const getTitleClasses = () => {
    const baseClasses = "font-semibold";
    const typeClasses = {
      warning: "text-[#FFE0C2]",
      error: "text-red-400",
      info: "text-[#FFE0C2]"
    };
    return cn(baseClasses, typeClasses[type]);
  };

  const getMessageClasses = () => {
    const baseClasses = "text-sm";
    const typeClasses = {
      warning: "text-[#CCCCCC]",
      error: "text-[#CCCCCC]",
      info: "text-[#CCCCCC]"
    };
    return cn(baseClasses, typeClasses[type]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={getContainerClasses()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className={getModalClasses()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.div 
              className="flex items-start gap-3 py-8 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {getIcon()}

              <div className="flex-1 space-y-1">
                <motion.h3 
                  className={getTitleClasses()}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {title}
                </motion.h3>
                <motion.p 
                  className={getMessageClasses()}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {message}
                </motion.p>

                {details.length > 0 && (
                  <motion.ul 
                    className="mt-2 space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    {details.map((detail, index) => (
                      <motion.li 
                        key={index} 
                        className="text-xs text-[#CCCCCC]/80 flex items-center gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                      >
                        <span className="w-1 h-1 bg-[#FFE0C2]/60 rounded-full"></span>
                        {detail}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>

              <motion.button
                onClick={onClose}
                className="relative p-2 rounded-full bg-[#FFE0C2] cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <X className="h-5 w-5 text-popover-foreground" />
              </motion.button>
              
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Warning;

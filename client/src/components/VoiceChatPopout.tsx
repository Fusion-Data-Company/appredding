import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, X, MessageSquarePlus, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const VoiceChatPopout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-36 right-4 z-[1000] print:hidden">
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="origin-top-right"
          >
            <Card className="w-[380px] shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/20 overflow-visible">
              <CardHeader className="p-4 pb-2 bg-gradient-to-r from-blue-600/20 to-orange-600/20 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <Mic className="h-5 w-5 text-orange-400" />
                    <span>Voice Assistant</span>
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10 text-gray-300"
                      onClick={toggleExpanded}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7 rounded-full hover:bg-white/10 text-gray-300"
                      onClick={toggleExpanded}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-3 min-h-[300px]">
                <p className="text-gray-300 text-sm mb-3">
                  Talk to Praetorian AI about Praetorian SmartCoat products and services, get help with an issue, or just ask for a tour of the product and it's use cases.
                </p>
                <div className="elevenlabs-container w-full flex items-center justify-center" style={{ height: '250px', position: 'relative' }}>
                  <div 
                    className="elevenlabs-container w-full h-full flex items-center justify-center"
                    style={{
                      position: 'relative',
                      zIndex: 10,
                      overflow: 'visible',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `<elevenlabs-convai agent-id="ybtdqCeRrbskLzgWulrg"></elevenlabs-convai>`
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <Button
              onClick={toggleExpanded}
              size="icon"
              className="h-16 w-16 rounded-full dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:shadow-[0_0_10px_rgba(59,130,246,0.2)] shadow-[0_0_5px_rgba(0,0,0,0.1)] border border-gray-200/30 dark:border-blue-600/30 flex items-center justify-center transition-all hover:scale-110 group"
            >
              <Mic className="h-8 w-8 dark:text-blue-400 text-blue-600 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceChatPopout;
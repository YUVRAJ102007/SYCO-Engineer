import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShoppingCart,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
  Zap,
  CheckCircle2,
  Cpu,
  Info,
} from 'lucide-react';
import { ChatMessage } from '../../types/assistant';
import { PRODUCTS } from '../../data/products';
import { findMatchingProducts } from '../../utils/nlpMatcher';
import { useCart } from '../../context/CartContext';
import { useComparison } from '../../context/ComparisonContext';
import { formatCurrency } from '../../utils/formatters';

interface SmartShoppingAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: "Hello! I am Zenvora's Smart Shopping Assistant. Tell me what you're looking for, your budget constraints, or specific features you need, and I'll find and explain the best matching products from our catalogue.",
    timestamp: 'Just now',
    suggestedFollowUps: [
      'I need a laptop under ₹60,000 for programming, machine learning, and gaming.',
      'Best noise cancelling headphones under ₹10,000 for work',
      'Smartwatch for fitness and outdoor running under ₹5,000',
      'Espresso machine for home under ₹20,000 with milk frother',
      'Running shoes with carbon plate under ₹3,000',
    ],
  },
];

export const SmartShoppingAssistantModal: React.FC<SmartShoppingAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useComparison();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. Perform rule-based NLP catalog search
    setTimeout(() => {
      const { matches, intent } = findMatchingProducts(query, PRODUCTS, 3);

      let replyText = '';
      let followUps: string[] = [];

      if (matches.length > 0) {
        const topMatch = matches[0];
        replyText = `I analyzed your requirements`;
        if (intent.category) replyText += ` for **${intent.category}**`;
        if (intent.maxBudget) replyText += ` under **₹${intent.maxBudget.toLocaleString('en-IN')}**`;
        if (intent.features.length > 0) replyText += ` featuring **${intent.features.join(', ')}**`;
        replyText += `.\n\nHere are the top ${matches.length} matching products from our catalogue with detailed rationale for each:`;

        followUps = [
          'Compare these options side-by-side',
          'Show cheaper alternatives',
          'Check user reviews for the top pick',
        ];
      } else {
        replyText = `I searched our catalogue for "${query}", but couldn't find an exact match within those specific parameters. Here are a few popular categories you can explore:`;
        followUps = [
          'Show bestselling laptops',
          'Show top rated audio & headphones',
          'Deals of the day under ₹5,000',
        ];
      }

      const assistantMsg: ChatMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        recommendations: matches,
        suggestedFollowUps: followUps,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      {/* Modal/Drawer Container */}
      <div className="relative w-full max-w-xl h-full sm:h-[88vh] bg-white dark:bg-slate-900 sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-left">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-aura-950 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aura-500 to-cyan-400 flex items-center justify-center shadow-glow">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-tight">Zenvora Smart Shopping Assistant</h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  AI Rule-Engine v1.0
                </span>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Online & parsing natural requirements in real-time</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Reset conversation"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Close assistant"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="px-4 py-2 bg-indigo-50/70 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-[11px] text-indigo-900 dark:text-indigo-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Info size={13} className="text-indigo-600 shrink-0" />
            Transparent prototype engine: Natural requirements are evaluated directly against catalog specs.
          </span>
        </div>

        {/* Message Flow */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              <div
                className={`flex gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-aura-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Sparkles size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-aura-600 to-indigo-600 text-white shadow-sm rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-xs rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`text-[10px] block mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-aura-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <User size={16} />
                  </div>
                )}
              </div>

              {/* Product Recommendation Cards (if any) */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="ml-11 space-y-3 my-2">
                  {msg.recommendations.map(({ product, matchScore, matchReasons }) => {
                    const isCompared = isInCompare(product.id);

                    return (
                      <div
                        key={product.id}
                        className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex gap-3.5">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-20 h-20 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-aura-600 uppercase">
                                {product.brand}
                              </span>
                              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                                {matchScore}% Match
                              </span>
                            </div>

                            <Link
                              to={`/product/${product.id}`}
                              onClick={onClose}
                              className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-aura-600 line-clamp-2 mt-0.5"
                            >
                              {product.title}
                            </Link>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                                {formatCurrency(product.price)}
                              </span>
                              {product.originalPrice > product.price && (
                                <span className="text-[11px] text-slate-400 line-through">
                                  {formatCurrency(product.originalPrice)}
                                </span>
                              )}
                              <span className="text-[11px] text-emerald-600 font-bold">
                                {product.discountPercentage}% OFF
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Rationale explanation bullets */}
                        <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            Why this matches your query:
                          </span>
                          <ul className="space-y-1">
                            {matchReasons.map((reason, idx) => (
                              <li
                                key={idx}
                                className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
                              >
                                <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <button
                            onClick={() => addToCompare(product)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                              isCompared
                                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950 text-cyan-600'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <SlidersHorizontal size={13} />
                            <span>{isCompared ? 'Compared' : 'Compare'}</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/product/${product.id}`}
                              onClick={onClose}
                              className="px-3 py-1.5 text-xs font-bold text-aura-600 dark:text-aura-400 hover:underline"
                            >
                              View Specs
                            </Link>

                            <button
                              onClick={() => addToCart(product, 1)}
                              className="px-3.5 py-1.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                            >
                              <ShoppingCart size={13} />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Follow-up / Suggested question chips */}
              {msg.suggestedFollowUps && (
                <div className="ml-11 flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedFollowUps.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="text-left text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-aura-50 dark:hover:bg-aura-950/50 hover:text-aura-600 dark:hover:text-aura-400 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-aura-600 text-white flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aura-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-aura-500 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-aura-500 animate-bounce delay-200"></span>
                <span className="text-xs text-slate-500 ml-1">Analyzing catalogue specifications & constraints...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2 items-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. I need a laptop under ₹60,000 for programming, ML and gaming..."
              className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-aura-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-3 bg-gradient-to-r from-aura-600 to-indigo-600 hover:from-aura-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl shadow transition"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

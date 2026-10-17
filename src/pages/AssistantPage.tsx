import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  User,
  Send,
  SlidersHorizontal,
  ShoppingCart,
  CheckCircle2,
  RotateCcw,
  Zap,
  Info,
  Laptop,
  Shirt,
  Home,
  Dumbbell,
} from 'lucide-react';
import { ChatMessage } from '../types/assistant';
import { PRODUCTS } from '../data/products';
import { findMatchingProducts } from '../utils/nlpMatcher';
import { useCart } from '../context/CartContext';
import { useComparison } from '../context/ComparisonContext';
import { formatCurrency } from '../utils/formatters';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-ast-1',
    sender: 'assistant',
    text: "Welcome to Aura's AI-Powered Shopping Concierge! 🌟\n\nI can cross-examine our product specifications, benchmark scores, price points, and verified reviews against your exact needs.\n\nTry asking me complex queries like:\n• \"I need a laptop under ₹60,000 for programming, machine learning, and gaming.\"\n• \"Best noise cancelling headphones under ₹10,000 for daily coding\"\n• \"Smartwatch with AMOLED and GPS under ₹5,000\"\n• \"Espresso machine with 15 bar pump and milk frother\"",
    timestamp: 'Just now',
    suggestedFollowUps: [
      'I need a laptop under ₹60,000 for programming, machine learning, and gaming.',
      'Best noise cancelling headphones under ₹10,000',
      'Smartwatch for fitness and outdoor running under ₹5,000',
      'Espresso machine for home under ₹20,000',
      'Running shoes with carbon plate under ₹3,000',
    ],
  },
];

export const AssistantPage: React.FC = () => {
  const { addToCart } = useCart();
  const { addToCompare, isInCompare } = useComparison();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const { matches, intent } = findMatchingProducts(query, PRODUCTS, 4);

      let replyText = '';
      let followUps: string[] = [];

      if (matches.length > 0) {
        replyText = `I evaluated your criteria`;
        if (intent.category) replyText += ` for **${intent.category}**`;
        if (intent.maxBudget) replyText += ` under **₹${intent.maxBudget.toLocaleString('en-IN')}**`;
        if (intent.features.length > 0) replyText += ` with specific focus on **${intent.features.join(', ')}**`;
        replyText += `.\n\nHere are the top ${matches.length} matching products from our catalogue with spec-backed rationale:`;

        followUps = [
          'Compare all recommended options',
          'Show lower-priced alternatives',
          'Check delivery dates to my pincode',
        ];
      } else {
        replyText = `I couldn't locate an exact catalogue match for "${query}". Here are some popular categories you can try exploring:`;
        followUps = [
          'Find coding laptops under ₹60,000',
          'Explore top-rated studio headphones',
          'Show flash deals under ₹5,000',
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
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Architecture Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-aura-950 to-indigo-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-aura-500 to-cyan-400 flex items-center justify-center shadow-glow shrink-0">
            <Bot size={26} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">
                Smart Shopping Assistant
              </h1>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                Rule-Engine v1.0
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Natural requirement parsing • Multi-factor constraint matching • Spec-backed rationale
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw size={14} />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Main Chat Flow Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[70vh] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              <div
                className={`flex gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-xl bg-aura-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Sparkles size={18} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-3xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-aura-600 to-indigo-600 text-white shadow-sm rounded-br-none'
                      : 'bg-slate-50 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 shadow-xs rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`text-[10px] block mt-2 text-right ${
                      msg.sender === 'user' ? 'text-aura-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <User size={18} />
                  </div>
                )}
              </div>

              {/* Product Recommendation Cards (if any) */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  {msg.recommendations.map(({ product, matchScore, matchReasons }) => {
                    const isCompared = isInCompare(product.id);

                    return (
                      <div
                        key={product.id}
                        className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 rounded-3xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex gap-3">
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="w-20 h-20 object-cover rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase text-aura-600">
                                  {product.brand}
                                </span>
                                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                                  {matchScore}% Match
                                </span>
                              </div>
                              <Link
                                to={`/product/${product.id}`}
                                className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-aura-600 line-clamp-2 mt-0.5"
                              >
                                {product.title}
                              </Link>
                              <div className="mt-1 flex items-baseline gap-2">
                                <span className="font-black text-sm text-slate-900 dark:text-white">
                                  {formatCurrency(product.price)}
                                </span>
                                <span className="text-[10px] text-emerald-600 font-bold">
                                  {product.discountPercentage}% OFF
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Rationale list */}
                          <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              Recommendation Reasoning:
                            </span>
                            <ul className="space-y-1">
                              {matchReasons.map((r, i) => (
                                <li
                                  key={i}
                                  className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
                                >
                                  <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <button
                            onClick={() => addToCompare(product)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
                              isCompared
                                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950 text-cyan-600'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <SlidersHorizontal size={13} />
                            <span>{isCompared ? 'In Compare' : 'Compare'}</span>
                          </button>

                          <button
                            onClick={() => addToCart(product, 1)}
                            className="px-4 py-1.5 bg-aura-600 hover:bg-aura-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                          >
                            <ShoppingCart size={13} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Follow-up suggestions */}
              {msg.suggestedFollowUps && (
                <div className="ml-12 flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedFollowUps.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-aura-50 dark:hover:bg-aura-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-aura-600 text-white flex items-center justify-center shrink-0">
                <Sparkles size={18} />
              </div>
              <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-aura-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-aura-500 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-aura-500 animate-bounce delay-200"></span>
                <span className="text-xs text-slate-500 ml-1">
                  Parsing constraints and cross-referencing catalogue specifications...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-3 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. I need a laptop under ₹60,000 for programming, machine learning, and gaming..."
              className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-aura-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-6 py-3 bg-gradient-to-r from-aura-600 to-indigo-600 hover:from-aura-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs sm:text-sm rounded-2xl shadow transition flex items-center gap-2"
            >
              <span>Ask</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

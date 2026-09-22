"use client";

import React from "react";

interface TechIconProps {
  className?: string;
}

// 1. Next.js
export function NextJsIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
    </svg>
  );
}

// 2. React
export function ReactIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#087EA4" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>
  );
}

// 3. TypeScript
export function TypeScriptIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#3178C6" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  );
}

// 4. Tailwind CSS
export function TailwindIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  );
}

// 5. Supabase
export function SupabaseIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#3ECF8E" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
    </svg>
  );
}

// 6. Docker
export function DockerIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </svg>
  );
}

// 7. Coolify
export function CoolifyIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#6B16ED" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.364 4.364V0h17.454v4.364zm0 13.09H0V4.365h4.364zm0 0h17.454v4.364H4.364ZM6.545 6.546v-1.7H22.3V2.182H24v4.363zm0 0v10.4h-1.7v-10.4ZM3.882 17.936v1.7h-1.7v-1.7ZM24 24H6.545v-1.7H22.3v-2.664H24Z" />
    </svg>
  );
}

// 8. Google Gemini AI
export function GeminiIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="geminiGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1BA1E3" />
          <stop offset="0.5" stopColor="#5E58D2" />
          <stop offset="1" stopColor="#E94C89" />
        </linearGradient>
      </defs>
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill="url(#geminiGrad)"
      />
    </svg>
  );
}

// 9. MCP Protocol
export function McpIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="6" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="1.8"/>
      <circle cx="8" cy="8" r="2" fill="#8B5CF6"/>
      <circle cx="16" cy="8" r="2" fill="#8B5CF6"/>
      <circle cx="12" cy="16" r="2" fill="#8B5CF6"/>
      <path d="M8 8L16 8M8 8L12 16M16 8L12 16" stroke="#8B5CF6" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

// 10. Mermaid.js
export function MermaidIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="7" height="6" rx="2" fill="#FF3670"/>
      <rect x="15" y="4" width="7" height="6" rx="2" fill="#7A39FB"/>
      <rect x="8.5" y="14" width="7" height="6" rx="2" fill="#00D2D3"/>
      <path d="M5.5 10v2a2 2 0 002 2h4.5M18.5 10v2a2 2 0 01-2 2h-4.5" stroke="#718096" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

// 11. Android Native
export function AndroidIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#3DDC84" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.607 5.084l1.52-2.632a.542.542 0 00-.198-.74.542.542 0 00-.74.198l-1.55 2.684A10.82 10.82 0 0012 4.148c-1.282 0-2.5.212-3.639.586L6.81 2.05a.543.543 0 00-.74-.198.542.542 0 00-.198.74l1.52 2.632C4.12 6.848 2 10.158 2 14h20c0-3.842-2.12-7.152-5.393-8.916zM7 10a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM2 15.5h20v2.5a3 3 0 01-3 3H5a3 3 0 01-3-3v-2.5z"/>
    </svg>
  );
}

// 12. QRIS
export function QrisIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#ED1C24" />
      <path d="M4 4h5v5H4V4zm7 0h2v2h-2V4zm4 0h5v5h-5V4zm-9 2H6v1h2V6zm11 0h-2v1h2V6zM4 15h5v5H4v-5zm2 2v1h1v-1H6zm5-2h2v2h-2v-2zm4 0h2v2h-2v-2zm3 0h2v5h-2v-2h-3v-1h3v-2zm-7 3h2v2h-2v-2z" fill="#FFFFFF" />
    </svg>
  );
}

// 13. HMAC / Security
export function HmacIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// 14. HTML5
export function Html5Icon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#E34F26" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
  );
}

// 15. CSS3
export function Css3Icon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1572B6" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm15.7 6.4L5.6 6.4l.3 3.6h10.9l-.4 4.5-4.4 1.2-4.4-1.2-.2-2.5H4.2l.4 4.9 7.4 2 7.4-2 .8-8.9.2-3.7z" />
    </svg>
  );
}

// 16. JavaScript
export function JavaScriptIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#F7DF1E" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0V0z"/>
      <path d="M13.7 17.5c.6 1 1.4 1.6 2.7 1.6 1.2 0 1.9-.6 1.9-1.4 0-1-.8-1.3-2.1-1.9l-.7-.3c-2.1-.9-3.4-2-3.4-4.4 0-2.2 1.7-3.9 4.3-3.9 1.9 0 3.2.7 4.1 2.3l-2.2 1.4c-.5-.8-1-1.2-1.9-1.2-.9 0-1.5.5-1.5 1.2 0 .8.6 1.2 1.8 1.7l.7.3c2.4 1 3.8 2.1 3.8 4.6 0 2.6-2 4.1-4.8 4.1-2.7 0-4.3-1.3-5.2-3.1l2.5-1.5zm-8.2-.3c.4.7.8 1.3 1.6 1.3.8 0 1.3-.3 1.3-1.6v-9.6h2.8v9.7c0 2.8-1.6 4.1-3.9 4.1-2.1 0-3.3-1.1-4-2.5l2.2-1.4z" fill="#000000"/>
    </svg>
  );
}

// 17. Node.js
export function NodeJsIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#5FA04E" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072a.274.274 0 00-.271 0L3.075 6.68c-.085.049-.139.145-.139.241v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.279.161-.598.245-.924.245z" />
    </svg>
  );
}

// 18. Express
export function ExpressIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5h-2v-9h2v9zm6 0h-2v-4.5c0-.83-.67-1.5-1.5-1.5S12 11.17 12 12v4.5h-2v-9h2v1.2c.6-.8 1.5-1.2 2.5-1.2 1.93 0 3.5 1.57 3.5 3.5v5.5z"/>
    </svg>
  );
}

// 19. WhatsApp
export function WhatsAppIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// 20. Google Drive
export function GoogleDriveIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.2 2l-6.2 10.7 4.3 7.3 6.2-10.7L8.2 2z" fill="#0066DA"/>
      <path d="M15.8 2H8.2l4.3 7.3h7.6L15.8 2z" fill="#00AC47"/>
      <path d="M22 12.7l-4.3-7.3-4.3 7.3 4.3 7.3H22v-7.3z" fill="#EA4335"/>
      <path d="M6.3 20l4.3-7.3H22L17.7 20H6.3z" fill="#FFBA00"/>
    </svg>
  );
}

// 21. Cloudflare
export function CloudflareIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#F38020" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727" />
    </svg>
  );
}

// 22. TanStack Router
export function TanStackIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tanGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EA4335"/>
          <stop offset="0.5" stopColor="#FBBC05"/>
          <stop offset="1" stopColor="#34A853"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#tanGrad)"/>
      <path d="M8 8h8M12 8v8" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

// 23. Vercel
export function VercelIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L24 22H0L12 1z" />
    </svg>
  );
}

// 24. VAPID / Push Notification
export function PushNotificationIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

// 25. Responsive
export function ResponsiveIcon({ className = "w-3.5 h-3.5" }: TechIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}

// Helper to get matching official tech icon
export function getTechIcon(name: string, className = "w-3.5 h-3.5 shrink-0") {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes("next")) return <NextJsIcon className={className} />;
  if (normalized.includes("react")) return <ReactIcon className={className} />;
  if (normalized.includes("typescript") || normalized === "ts") return <TypeScriptIcon className={className} />;
  if (normalized.includes("tailwind")) return <TailwindIcon className={className} />;
  if (normalized.includes("supabase") || normalized.includes("postgres")) return <SupabaseIcon className={className} />;
  if (normalized.includes("docker")) return <DockerIcon className={className} />;
  if (normalized.includes("coolify")) return <CoolifyIcon className={className} />;
  if (normalized.includes("gemini")) return <GeminiIcon className={className} />;
  if (normalized.includes("mcp")) return <McpIcon className={className} />;
  if (normalized.includes("mermaid")) return <MermaidIcon className={className} />;
  if (normalized.includes("android")) return <AndroidIcon className={className} />;
  if (normalized.includes("qris")) return <QrisIcon className={className} />;
  if (normalized.includes("hmac") || normalized.includes("security") || normalized.includes("sha")) return <HmacIcon className={className} />;
  if (normalized.includes("html")) return <Html5Icon className={className} />;
  if (normalized.includes("css")) return <Css3Icon className={className} />;
  if (normalized.includes("javascript") || normalized === "js") return <JavaScriptIcon className={className} />;
  if (normalized.includes("node")) return <NodeJsIcon className={className} />;
  if (normalized.includes("express")) return <ExpressIcon className={className} />;
  if (normalized.includes("whatsapp") || normalized.includes("baileys")) return <WhatsAppIcon className={className} />;
  if (normalized.includes("drive")) return <GoogleDriveIcon className={className} />;
  if (normalized.includes("cloudflare")) return <CloudflareIcon className={className} />;
  if (normalized.includes("tanstack")) return <TanStackIcon className={className} />;
  if (normalized.includes("vercel")) return <VercelIcon className={className} />;
  if (normalized.includes("vapid") || normalized.includes("push")) return <PushNotificationIcon className={className} />;
  if (normalized.includes("responsive")) return <ResponsiveIcon className={className} />;

  // Default fallback icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// Reusable TechBadge Pill Component
export default function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100/90 hover:bg-neutral-200/90 text-neutral-800 text-xs font-medium border border-neutral-200/70 transition-all duration-200 shadow-2xs hover:shadow-xs group select-none"
      title={name}
    >
      {getTechIcon(name, "w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:scale-115")}
      <span className="font-semibold text-[11px] text-neutral-700 tracking-tight leading-none">{name}</span>
    </span>
  );
}

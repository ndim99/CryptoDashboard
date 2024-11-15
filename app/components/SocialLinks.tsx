import Link from "next/link";
import Image from "next/image";

interface SocialLinksProps {
  socials: { platform: string; url: string }[];
}

export default function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-2">
      {socials.map((social, index) => (
        <Link
          key={social.platform}
          href={social.url}
          target="_blank"
          className={`text-blue-400 text-sm hover:underline ${
            index > 0 ? "border-l-2 border-gray-600 pl-2" : ""
          }`}
        >
          {social.platform === "twitter" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="none"
              className="w-4 h-4"
            >
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                fill="currentColor"
              />
            </svg>
          )}
          {social.platform === "etherscan" && (
            <Image
              src="/etherscan.svg"
              alt="etherscan"
              width={16}
              height={16}
            />
          )}
          {social.platform === "solscan" && (
            <Image src="/solscan.png" alt="solscan" width={16} height={16} />
          )}
        </Link>
      ))}
    </div>
  );
}

declare module "react-mailcheck" {
  const MailCheck: React.FC<{
    email: string | undefined;
    children: (({ suggestion }: { suggestion: { full: string | null } }) => Element) & ReactNode;
  }>;
  export default MailCheck;
}

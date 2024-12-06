import Icons from "@/components/shared/icons";
import { ModeToggle } from "@/components/shared/mode-toggle";
import Wrapper from "@/components/shared/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { applicationName, social } from "@/constant/app-config";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <Wrapper className="md:py-10">
        <div className="mx-auto md:flex md:items-center md:justify-between">
          <section className="flex items-center justify-center space-x-3 md:order-2">
            <ModeToggle />

            <Link
              href={social.githubUrl}
              target="_blank"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "!rounded-md",
              })}
            >
              <span className="sr-only">GitHub</span>
              <Icons.github className="h-5 w-5" />
            </Link>
            <Link
              href={social.linkedinUrl}
              target="_blank"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "!rounded-md",
              })}
            >
              <span className="sr-only">LinkedIn</span>
              <Icons.linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={social.twitterUrl}
              target="_blank"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
                className: "!rounded-md",
              })}
            >
              <span className="sr-only">Twitter</span>
              <Icons.twitterOrX className="h-5 w-5" />
            </Link>
          </section>
          <section className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground sm:text-sm">
              &copy; {currentYear} {applicationName}. All rights reserved.
            </p>
          </section>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;

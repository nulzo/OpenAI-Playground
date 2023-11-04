import { Button, Heading, Separator } from "@radix-ui/themes";
import { GithubIcon, SunDimIcon, SunMoonIcon } from "lucide-react";
import { IconBrandOpenai } from "@tabler/icons-react";

export default function NavBar() {
  return (
    <nav>
      <div className="h-14 border-b border-black flex justify-between align-center items-center align-middle">
        <div className="pl-10 align-middle flex space-x-2">
          <div className="flex align-middle items-center">
            <IconBrandOpenai size={32} stroke={1}/>
          </div>
          <Separator orientation="vertical" size={4} />
          <div>
            <Heading size="3">Open A.I. API</Heading>
            <Heading weight="light" size="1" className="flex justify-start">
              @nulzo
            </Heading>
          </div>
        </div>
        <div className="pr-10 flex space-x-6">
          <div>
            <Button variant="ghost" color="gray">
              <GithubIcon />
            </Button>
          </div>
          <div>
            <Button variant="ghost" color="gray">
              <SunMoonIcon />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

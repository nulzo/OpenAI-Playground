import { Button, Heading, Select, Separator } from "@radix-ui/themes";
import { GithubIcon, SettingsIcon, SunDimIcon, SunMoonIcon } from "lucide-react";
import { IconBrandOpenai } from "@tabler/icons-react";
import { useTheme } from "../fields/ThemeProvider";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <nav>
      <div className="h-14 border-b border flex bg-secondary/25 justify-between align-center items-center align-middle">
        <div className="pl-10 align-middle flex space-x-2">
          <div className="flex align-middle items-center">
            <IconBrandOpenai size={32} stroke={1} />
          </div>
          <Separator orientation="vertical" size={4} />
          <div>
            <Heading size="3">Open A.I. Playground</Heading>
            <Heading weight="light" size="1" className="flex justify-start">
              @nulzo
            </Heading>
          </div>
        </div>
        <div className="pr-10 flex align-center content-center items-center ">
          <div className="pl-4 flex space-x-4">
            <div>
              <Button variant="ghost" color="gray">
                <SettingsIcon />
              </Button>
            </div>
            <div>
              <Button variant="ghost" color="gray">
                <GithubIcon />
              </Button>
            </div>
            <div>
              <Button variant="ghost" color="gray" onClick={() => (theme === 'light' ? setTheme('dark') : setTheme('light'))}>
                <SunMoonIcon className="text-default" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

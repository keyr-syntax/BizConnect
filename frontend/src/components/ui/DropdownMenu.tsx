import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface DropdownMenuDemoProps {
  id: number;
}

const DropdownMenuDemo = ({ id }: DropdownMenuDemoProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex flex-row items-center justify-center text-lg bg-[#0D6EFD] py-1 px-3 rounded ml-10">
          Actions
          <ChevronDown size={25} className="inline" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[130px] rounded-md bg-white text-black p-[5px]"
          sideOffset={5}
        >
          <Link to={`/view_details/${id}`}>
            <DropdownMenu.Item className="text-[16px] text-black pl-2 pr-5 py-1 text-start hover:bg-gray-300 ">
              View Details
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator className="my-[5px] h-px bg-black" />
          <Link to="/">
            <DropdownMenu.Item className="text-[16px] text-black pl-2 pr-5 py-1 text-start hover:bg-gray-300">
              Edit{" "}
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator className="m-[5px] h-px bg-black" />
          <Link to="/">
            <DropdownMenu.Item className="text-[16px] text-black pl-2 pr-5 py-1 text-start hover:bg-gray-300">
              Delete{" "}
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator className="m-[5px] h-px bg-black" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;

import * as Menubar from "@radix-ui/react-menubar";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Menubar.Root className="bg-[#151533] flex flex-row items-center justify-evenly bg-default p-3 border border-solid border-[rgb(255,255,255,0.2)] rounded-none  z-999 fixed top-0 left-0 right-0">
        <Menubar.Menu>
          <Menubar.Trigger className="flex text-white select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[24px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            <Link to="/">BizConnect</Link>
          </Menubar.Trigger>
        </Menubar.Menu>
        <Menubar.Menu>
          <Menubar.Trigger className="flex text-white select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            <Link to="/add_company">Add New Company</Link>
          </Menubar.Trigger>
        </Menubar.Menu>
        {/* <Menubar.Menu>
          <Menubar.Trigger className="flex text-white select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Add New Company
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px]  bg-[#151533] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={5}
              alignOffset={-3}
            >
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/add_company`}>
                <Menubar.Item className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-[20px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Add Company
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu> */}
        {/* <Menubar.Menu>
          <Menubar.Trigger className="flex text-white select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[20px]  leading-none text-violet11 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
            Contacts
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[180px]  bg-[#151533] p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
              align="start"
              sideOffset={5}
              alignOffset={-3}
            >
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/add_contact`}>
                <Menubar.Item className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-[20px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Add Contact
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
              <Link to={`/all_contacts`}>
                <Menubar.Item className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-[20px] leading-none text-white outline-none data-[disabled]:pointer-events-none    data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
                  Contact List
                </Menubar.Item>
              </Link>
              <Menubar.Separator className="m-[5px] h-px bg-[rgb(255,255,255,0.2)]" />
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu> */}
      </Menubar.Root>
      <Outlet />
    </>
  );
}

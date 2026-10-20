import { getContact } from "@/lib/content";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const contact = await getContact();
  return <NavbarClient whatsapp={contact.whatsapp} />;
}

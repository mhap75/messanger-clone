import Sidebar from "../(site)/components/Sidebar";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";
import getUsers from "@/app/actions/getUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}

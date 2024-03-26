import Ticketform from "@/app/(components)/Ticketform";
import Nav from "@/app/(components)/Nav";

export const metadata = {
  title: "Create Ticket",
  description: "Created by Anmol Kansal",
};

const getTicketById = async (id) => {
  try {
    let apiUrl;
    if (process.env.NODE_ENV === 'production') {
      apiUrl = process.env.PROD_API_URL;
    } else {
      apiUrl = process.env.DEV_API_URL;
    }
    const res = await fetch(`${apiUrl}/${id}`, {
      cache: "no-store"
    })
    return res.json();
  } catch (error) {
    throw new Error("Failed to get Ticket")
  }
}

const Ticketpage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true
  let updateTicketData = {};
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket
  }
  else {
    updateTicketData = {
      _id: "new"
    }
  }
  return (
    <>
      <Nav />
      <Ticketform ticket={updateTicketData} />
    </>
  )

}

export default Ticketpage;

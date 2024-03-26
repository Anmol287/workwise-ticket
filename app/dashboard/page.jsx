import { TicketCard } from "@/app/(components)/TicketCard"
import Nav from "../(components)/Nav";

export const metadata = {
    title: "Dashboard",
    description: "Created by Anmol Kansal",
};

const getTickets = async () => {
    try {
        let apiUrl;
        if (process.env.NODE_ENV === 'production') {
            apiUrl = process.env.PROD_API_URL;
        } else {
            apiUrl = process.env.DEV_API_URL;
        }

        const res = await fetch(`${apiUrl}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};

const Dashboard = async () => {
    const data = await getTickets();

    // Make sure we have tickets needed for production build.
    if (!data?.tickets) {
        return <h1 className="text-center m-10">No Tickets Available.</h1>;
    }

    const tickets = data.tickets;

    const uniqueCategories = [
        ...new Set(tickets?.map(({ category }) => category)),
    ];


    return (
        <div className="flex flex-col h-screen max-h-screen">
            <Nav/>
            <div className="flex-grow overflow-y-auto">
        <div className="p-5">
            <div>
                {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => (
                    <div key={categoryIndex} className="mb-4 font-mono">
                        <h2>{uniqueCategory}</h2>
                        <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                            {tickets.filter((ticket) => ticket.category === uniqueCategory).map((filterTicket, _index) => (
                                <TicketCard
                                    id={_index}
                                    key={_index}
                                    ticket={filterTicket} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard

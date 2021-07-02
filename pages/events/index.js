import Head from "next/head";

import { getAllEvents } from "../../helpers/api-util";
import { useRouter } from "next/dist/client/router";

import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { Fragment } from "react";

function EventsPage(props) {
    const router = useRouter();
    const { events } = props;

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <Head>
                <title>NextJS All Events</title>
                <meta name="description" content="Cool events" />
            </Head>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    )
};

export async function getStaticProps() {
    const allEvents = await getAllEvents();

    return {
        props: {
            events: allEvents
        },
        revalidate: 60
    }
}

export default EventsPage;
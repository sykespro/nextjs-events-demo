import { Fragment } from "react";
import Head from 'next/head';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogisticis from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const DetailedEventPage = (props) => {
    const event = props.selectedEvent;

    if (!event) {
        return (
            <div className='center'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogisticis
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
};

export async function getStaticProps(context) {
    const eventId = context.params.id;

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    };
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params: { id: event.id } }));

    return {
        paths: paths,
        fallback: 'blocking'
    };
}

export default DetailedEventPage;
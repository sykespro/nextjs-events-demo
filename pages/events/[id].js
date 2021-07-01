import { useRouter } from "next/dist/client/router";
import { Fragment } from "react";
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogisticis from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from "../../components/ui/error-alert";

const DetailedEventPage = () => {
    const router = useRouter();

    const eventId = router.query.id;
    const event = getEventById(eventId);

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        )
    }

    return (
        <Fragment>
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

export default DetailedEventPage;
import gql from "graphql-tag";

export const Q_AGV_NEWSLETTER_GET_MESSAGE = gql`
  query agvGetNewsletterMessageById($id: Float!) {
    agvGetNewsletterMessageById(id: $id) {
      message {
        id
        title
        message
        status
      }
    }
  }
`;
export const Q_AGV_NEWSLETTER_GET_PAGE_MESSAGE = gql`
  query agvGetNewsletterMessagesPage($data: AGVNewsletterMessagePageInput!) {
    agvGetNewsletterMessagesPage(data: $data) {
      count
      messages {
        id
        title
        message
        status
      }
    }
  }
`;

export const M_AGV_NEWSLETTER_ADD_MESSAGE = gql`
  mutation agvPostNewsletterMessage($data: AGVNewsletterMessageInput!) {
    agvPostNewsletterMessage(data: $data)
  }
`;

export const M_AGV_NEWSLETTER_EDIT_MESSAGE = gql`
  mutation agvPutNewsletterMessage($data: AGVNewsletterMessageInput!) {
    agvPutNewsletterMessage(data: $data)
  }
`;

export const M_AGV_NEWSLETTER_DELETE_MESSAGE = gql`
  mutation agvDeleteNewsletterMessage($id: Float!) {
    agvDeleteNewsletterMessage(id: $id)
  }
`;

export const M_AGV_NEWSLETTER_SEND_MESSAGE = gql`
  mutation agvSendNewsletterMessage($id: Float!) {
    agvSendNewsletterMessage(id: $id)
  }
`;

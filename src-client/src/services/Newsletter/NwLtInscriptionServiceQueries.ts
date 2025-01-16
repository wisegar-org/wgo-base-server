import gql from "graphql-tag";

export const Q_AGV_NEWSLETTER_GET_INSCRIPTION = gql`
  query agvGetNewsletterInscriptionByEmail($email: String!) {
    agvGetNewsletterInscriptionByEmail(email: $email) {
      inscription {
        id
        email
        status
      }
    }
  }
`;

export const Q_AGV_NEWSLETTER_GET_PAGE_INSCRIPTION = gql`
  query agvGetNewsletterInscriptionsPage(
    $data: AGVNewsletterInscriptionPageInput!
  ) {
    agvGetNewsletterInscriptionsPage(data: $data) {
      count
      inscriptions {
        id
        email
        status
      }
    }
  }
`;

export const M_AGV_NEWSLETTER_ADD_INSCRIPTION = gql`
  mutation agvPostNewsletterInscription($data: AGVNewsletterInscriptionInput!) {
    agvPostNewsletterInscription(data: $data)
  }
`;

export const M_AGV_NEWSLETTER_EDIT_INSCRIPTION = gql`
  mutation agvPutNewsletterInscription($data: AGVNewsletterInscriptionInput!) {
    agvPutNewsletterInscription(data: $data)
  }
`;

export const M_AGV_NEWSLETTER_ZYNC_INSCRIPTIONS = gql`
  mutation agvZyncNewsletterInscriptions {
    agvZyncNewsletterInscriptions
  }
`;

export const M_AGV_NEWSLETTER_RESEND_INSCRIPTIONS_STATUS = gql`
  query agvGetNewsletterInscriptionsResendStatus(
    $data: AGVNewsletterInscriptionSendEmailStatusInput!
  ) {
    agvGetNewsletterInscriptionsResendStatus(data: $data)
  }
`;

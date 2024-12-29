import { gql } from '@apollo/client';

// ==============> TRANSLATION PROJECT <================

export const PROPOSAL_NOTIFICATION = gql`
mutation PageOpeningNotification($pageOpeningNotificationId: ID) {
  pageOpeningNotification(id: $pageOpeningNotificationId)
}
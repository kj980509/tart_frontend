import {gql} from '@apollo/client';

export const BID_FRAGMENT = gql`
  fragment BidFragment on Bid {
    id
    price
    createdAt
    isSuccessed
  }
`;

export const ART_PHOTOS_FRAGMENT = gql`
  fragment ArtPhotoFragment on ArtPhoto {
    id
    artId
    imageUrl
  }
`;

export const ART_QUESTION_FRAGMENT = gql`
  fragment ArtQuestionFragment on ArtQuestion {
    question
    isAnswered
  }
`;

export const ART_FRAGMENT = gql`
  fragment ArtFragment on Art {
    id
    title
    WorkingStartYear
    WorkingStartMonth
    WorkingStartDay
    WorkingEndYear
    WorkingEndMonth
    WorkingEndDay
    explain
    categoryId
    isSuccessed
    totalLikes
    createdAt
    updatedAt
    error
    questions {
      question
      userId
    }
    photos {
      ...ArtPhotoFragment
    }
  }
  ${ART_PHOTOS_FRAGMENT}
`;

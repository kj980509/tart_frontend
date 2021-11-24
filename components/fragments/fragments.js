import {gql} from '@apollo/client';

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      userName
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    userName
    gender
    email
  }
`;

export const ART_PHOTOS_FRAGMENT = gql`
  fragment ArtPhotoFragment on ArtPhoto {
    id
    artId
    imageUrl
  }
`;

export const BID_FRAGMENT = gql`
  fragment BidFragment on Bid {
    id
    price
    createdAt
    isSuccessed
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
    categoryId
    isSuccessed
    totalLikes
    createdAt
    updatedAt
    error
    photos {
      ...ArtPhotoFragment
    }
  }
  ${ART_PHOTOS_FRAGMENT}
`;

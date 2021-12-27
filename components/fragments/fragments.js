import {gql} from '@apollo/client';
export const USER_FRAGMENT = gql`
  fragment UserFragment on User{
    id
    userName
    gender
    email
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
export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on PostComment{
    id
    user{
      ...UserFragment
    }
    userId
    comment
    rootCommentId
    postId
    isMine
    post{
      id
    }
  }
  ${USER_FRAGMENT}
`;

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post{
    id
    title
    post
    imageUrl
    category{
      id
      category
    }
    categoryId
    isHot
    totalLikes
    updatedAt
    createdAt
    user{
      ...UserFragment
    }
    userId
    comments{
      ...CommentFragment
    }
    error
    isMine
  }
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
`;

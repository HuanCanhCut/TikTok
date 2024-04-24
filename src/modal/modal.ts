export interface UserModal {
    id: number
    first_name: string
    last_name: string
    nickname: string
    avatar: string
    gender: string
    bio: string
    email: string
    social_id: number
    social_type: string
    social_email: string
    tick: boolean
    date_of_birth: Date
    followings_count: number
    followers_count: number
    likes_count: number
    website_url: string
    facebook_url: string
    youtube_url: string
    twitter_url: string
    instagram_url: string
    email_verified_at: string
    created_at: Date
    is_liked: boolean
    is_followed: boolean
    updated_at: Date
    videos?: VideoModal[]
}

interface Resolution {
    resolution_x: number
    resolution_y: number
}

interface Video {
    video: Resolution
}

export interface VideoModal {
    id: number
    user_id: number
    type: string
    thumb_url: string
    file_url: string
    description: string
    music: string
    is_liked: boolean
    likes_count: number
    comments_count: number
    shares_count: number
    views_count: number
    viewable: string
    allows: string[]
    user: UserModal
    meta: Video
}

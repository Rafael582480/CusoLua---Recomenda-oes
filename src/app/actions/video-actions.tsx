'use server';

import { APIyoutube } from "@/shared/services/api-youtube";

export async function getVideoData(videoId: string) {
    const course = await APIyoutube.course.getById(videoId);
    return course;
}
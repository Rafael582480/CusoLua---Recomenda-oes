'use server';

import { APIyoutube } from "@/src/shared/services/api-youtube";

export async function getVideoData(videoId: string) {
    const course = await APIyoutube.course.getById(videoId);
    return course;
}
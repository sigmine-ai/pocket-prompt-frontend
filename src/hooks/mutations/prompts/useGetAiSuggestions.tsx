"use client";

import { POST } from "@/apis/client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * AI 제안 응답 타입
 */
interface AiSuggestionResponse {
    success: boolean;
    detail: string;
    data: {
        title: string;
        description: string;
    };
}

/**
 * 프롬프트 등록 - 제목, 설명 AI 제안 받기
 */
const getAiSuggestion = async (
    promptTemplate: string
): Promise<{ title: string; description: string }> => {
    const response: AxiosResponse<AiSuggestionResponse> = await POST(
        "/prompts/suggestions",
        {
            prompt_template: promptTemplate,
        }
    );

    const { data } = response;

    return data.data;
};

export const useGetAiSuggestions = (
    promptTemplateValue: string,
    suggestionType: "제목" | "설명",
    retryKey: number
) => {
    return useQuery<{ title: string; description: string }>({
        queryKey: [
            "aiSuggestions",
            suggestionType,
            retryKey,
        ],
        queryFn: () => getAiSuggestion(promptTemplateValue),
        enabled: !!promptTemplateValue && retryKey > 0, // retryKey가 0보다 클 때만 요청 (명시적으로 트리거된 경우만)
        staleTime: Infinity, // 캐시된 데이터를 항상 신선하게 유지 (자동 refetch 방지)
    });
};

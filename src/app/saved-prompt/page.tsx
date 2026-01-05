"use client";

import Text from "@/components/common/Text/Text";
import PromptCardImage from "@/components/home/prompt/card/PromptCardImage";
import PromptCardText from "@/components/home/prompt/card/PromptCardText";
import PromptList from "@/components/home/prompt/list/PromptList";
import SearchBar from "@/components/home/searchUI/SearchBar";
import HomeLnb from "@/components/lnb/HomeLnb";
import { useSearch } from "@/hooks/queries/useSearch";
import { useUser } from "@/hooks/useUser";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";

export default function SavedPromptPage() {
    const { isUnderTablet } = useDeviceSize();
    const [isInitialized, setIsInitialized] = useState(false);
    const { userData } = useUser();
    const [activeTab, setActiveTab] = useState<"text" | "image">("text");
    const [keyword, setKeyword] = useState("");

    const [searchedKeyword, setSearchedKeyword] =
        useRecoilState(searchedKeywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );

    const { handleSearch, searchResults, isLoading, isUnauthorized } = useSearch(activeTab);
    const router = useRouter();

    useEffect(() => {
        setIsInitialized(true);
        return () => {
            setSearchedKeyword("");
            setSearchedCategory("total");
            setKeyword("");
        };
    }, [setSearchedKeyword, setSearchedCategory]);

    if (!isInitialized) {
        return null;
    }

    // 401 에러 시 로그인 안내 화면
    if (isUnauthorized || !userData.isLogin) {
        return (
            <HomeWrapper>
                <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                    <HomeLnb initialMenu="4" />
                    <ContentWrapper>
                        <LoginRequiredWrapper>
                            <Text font="h1_24_bold" color="G_700">
                                🔐 로그인이 필요합니다
                            </Text>
                            <Text font="b1_18_reg" color="G_500" style={{ marginTop: 12 }}>
                                저장한 프롬프트를 보려면 로그인해 주세요.
                            </Text>
                            <Button
                                onClick={() => router.push("/")}
                                size={44}
                                style={{ marginTop: 24 }}
                            >
                                <Text font="b2_16_semi" color="white">
                                    홈으로 이동
                                </Text>
                            </Button>
                        </LoginRequiredWrapper>
                    </ContentWrapper>
                </HomeContentWrapper>
            </HomeWrapper>
        );
    }

    const onChangeKeyword = (value: string) => {
        setKeyword(value);
    };

    const onEnter = () => {
        setSearchedKeyword(keyword);
        handleSearch(keyword, searchedCategory);
    };

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <HomeLnb initialMenu="4" />
                <ContentWrapper>
                    <TitileWrap>
                        <Text font="h1_24_bold" color="primary_100">
                            💾 {userData.user?.nickname}
                        </Text>
                        <Text font="h1_24_bold">님이 저장한 프롬프트</Text>
                    </TitileWrap>

                    <SearchBar
                        value={keyword}
                        onChange={onChangeKeyword}
                        onEnter={onEnter}
                        placeholder="필요한 프롬프트를 검색해보세요"
                        id="search-input"
                    />
                    <PromptList
                        viewType="starred"
                        searchType={searchResults ? "search" : "total"}
                        keyword={searchedKeyword}
                        searchedCategory={searchedCategory}
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            if (tab === "text" || tab === "image") {
                                setActiveTab(tab);
                                // 탭 변경 시 검색 초기화
                                setKeyword("");
                                setSearchedKeyword("");
                                handleSearch("", searchedCategory);
                            }
                        }}
                        renderItem={(item, idx) =>
                            item.type === "image" ? (
                                <PromptCardImage
                                    promptType="image"
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    sampleMedia={item.sample_media}
                                    views={item.views}
                                    star={item.star}
                                    usages={item.usages}
                                    isMiniHeight={false}
                                />
                            ) : (
                                <PromptCardText
                                    promptType="text"
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    views={item.views}
                                    star={item.star}
                                    usages={item.usages}
                                    isMiniHeight={false}
                                />
                            )
                        }
                        items={searchResults}
                        isLoading={isLoading}
                    />
                </ContentWrapper>
            </HomeContentWrapper>
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()}
    gap: 40px;
    padding-top: 92px;
    align-items: start;
    width: 100vw;
    background-color: white;
`;

const HomeContentWrapper = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: ${({ $isUnderTablet }) => ($isUnderTablet ? "20px" : "40px")};
    margin: 0 auto;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
    padding-top: 0;
`;

const TitileWrap = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "", "center")};
    width: 100%;
    margin-bottom: 20px;
    gap: 5px;
`;

const LoginRequiredWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    width: 100%;
    min-height: 400px;
    padding: 40px;
    text-align: center;
`;

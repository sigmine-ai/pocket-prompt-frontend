import styled from "styled-components";
import Text from "@/components/common/Text/Text";

export default function Footer() {
    return (
        <FooterWrapper>
            <FooterText font="c1_12_reg" color="G_400">
                모든 가격은 원화로 표시되며, 환불은 서비스 이용약관에 따라
                진행됩니다.
                <br />
                프리미엄 제품 구매 결정 전 무료버전을 무제한으로 테스트해볼 수
                있습니다. 모든 가격은 당사 약관에 따라 변동될 수 있습니다.
                <br />
                모든 서비스는 시그마인(대한민국)에 의해 제공되며, 구매 시 확인된
                이용약관 및 결제 동의에 따릅니다.
            </FooterText>

            <Divider />

            <CompanySection>
                <NavLinks>
                    <NavLink
                        href="https://pocket-prompt.notion.site/da477857a0cc44888b06dd23cf6682ff"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        사용 가이드
                    </NavLink>
                    <NavDivider>|</NavDivider>
                    <NavLink
                        href="https://pocket-prompt.notion.site/Release-Note-fffd02185fca8083bad2ea2cbf1c3420"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        업데이트 노트
                    </NavLink>
                    <NavDivider>|</NavDivider>
                    <NavLink
                        href="https://pocket-prompt.notion.site/121d02185fca808ab505d697ad99ee04"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        서비스 이용약관
                    </NavLink>
                    <NavDivider>|</NavDivider>
                    <NavLink
                        href="https://pocket-prompt.notion.site/6dc9bbd2599a46d3bbcac24a18848770"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        개인정보처리방침
                    </NavLink>
                </NavLinks>
                <CompanyName>주식회사 시그마인</CompanyName>
                <InfoSection>
                    <InfoText>대표자명: 안대철 | 사업자등록번호: 738-81-03440</InfoText>
                    <InfoText>사업장 주소: 경기도 성남시 분당구 판교로289번길 20, 3동 1층 7호</InfoText>
                    <InfoText>유선번호: 070-4533-7094</InfoText>
                </InfoSection>
            </CompanySection>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    width: 100%;
    margin-top: 40px;
`;

const FooterText = styled(Text)`
    width: 100%;
    text-align: center;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #e2e8f0;
    margin: 32px 0;
`;

const CompanySection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`;

const NavLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
    margin-bottom: 8px;
`;

const NavLink = styled.a`
    font-size: 13px;
    font-weight: 400;
    color: #64748b;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const NavDivider = styled.span`
    font-size: 13px;
    color: #cbd5e1;
    padding: 0 8px;
`;

const CompanyName = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #475569;
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`;

const InfoText = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: #94a3b8;
`;

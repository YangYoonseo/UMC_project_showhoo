import poster1 from "../../assets/img_Booking/Booking/poster1.svg";
import poster2 from "../../assets/img_Booking/Booking/poster2.svg";
import poster3 from "../../assets/img_Booking/Booking/poster3.svg";
import poster4 from "../../assets/img_Booking/Booking/poster4.svg";

const Mockdata = [
    {
        id: 0,
        poster: poster1,
        price: 4000,
        name: "[최장순&미지니 콘서트] 파란약방.exe",
        date: new Date('2024-08-18T14:00:00'),
        like: false,
        amount: 70,
        place: '합정 드림홀',
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-17T23:30:00'),
        concert_inf: `
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
    {
        id: 1,
        poster: poster2,
        price: 4000,
        name: "2024 시나 쓰는 앨리스 소극장 콘서트 [핑]",
        date: new Date('2024-08-18T14:00:00'),
        like: false,
        place: '합정 드림홀',
        amount: 70,
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-17T23:30:00'),
        concert_inf: `
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
    {
        id: 2,
        poster: poster3,
        price: 4000,
        name: "[홍익대학교 소리얼] SO:RE-ALIVE",
        date: new Date('2024-08-18T14:00:00'),
        like: false,
        amount: 70,
        place: '합정 드림홀',
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-17T23:30:00'),
        concert_inf: `
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
    {
        id: 3,
        poster: poster4,
        price: 4000,
        name: "[홍익대학교 고스락] 고스락 제 25회 정기공연",
        date: new Date('2024-08-18T14:00:00'),
        like: true,
        place: '합정 드림홀',
        amount: 70,
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-17T23:30:00'),
        concert_inf:`
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
    {
        id: 4,
        poster: poster1,
        price: 4000,
        name: "[최장순&미지니 콘서트] 파란약방.exe",
        date: new Date('2024-08-03T14:00:00'),
        like: false,
        place: '합정 드림홀',
        amount: 70,
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-03T23:30:00'),
        concert_inf: `
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
    {
        id: 5,
        poster: poster2,
        price: 4000,
        name: "2024 시나 쓰는 앨리스 소극장 콘서트 [핑]",
        amount: 70,
        date: new Date('2024-08-02T14:00:00'),
        like: false,
        place: '합정 드림홀',
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-02T23:30:00'),
        concert_inf: `
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
    {
        id: 6,
        poster: poster3,
        price: 4000,
        amount: 70,
        name: "[홍익대학교 소리얼] SO:RE-ALIVE",
        date: new Date('2024-08-01T14:00:00'),
        like: false,
        place: '합정 드림홀',
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-17T23:30:00'),
        concert_inf:`
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
    {
        id: 7,
        poster: poster4,
        price: 4000,
        name: "[홍익대학교 고스락] 고스락 제 25회 정기공연",
        date: new Date('2024-08-01T14:00:00'),
        amount: 70,
        like: false,
        place: '합정 드림홀',
        runningtime: 120,
        host: '고스락',
        cancel: new Date('2024-08-17T23:30:00'),
        concert_inf: `
            3월 7일, 활동 기수들의 멋진 공연에 이어, <br>
            이번에는 3월 8일 19시, 합정 드림홀에서 고스락 선배님들의 공연이 막을 올립니다!<br><br>
            총 다섯 팀이 열심히 준비한 무대를 선보일 예정이니, 3월 8일에 합정 드림홀에서 만나요!<br><br>
            <strong>· 세트리스트</strong><br>
            잔나비-투게더! Fall Out Boy-Centuries<br>
            실리카겔 - Tik Tak Tok My Chemical Romance- Welcome to the Black Parade<br><br>
            <strong>· 공연 문의 안내</strong><br>
            공연에 대한 모든 문의는 <a href="https://link.to/kakao_channel" target="_blank">고스락 카카오톡 채널</a>로 남겨주세요!<br>
        `,
        refund_inf: `
            <strong>· 환불 안내</strong><br>
            공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
            승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
            <strong>· 공연 입장 안내</strong><br>
            공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
        `
    },
]

export default Mockdata;
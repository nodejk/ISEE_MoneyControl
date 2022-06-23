import ViewPager from "@react-native-community/viewpager";
import { useRef } from "react";
import { View } from "react-native";

import { Page } from "./Pages";
import { RoundedButton } from "./RoundedStartingButton";
import { Footer } from "./StartingScreenFooter";
import { PageLogin } from "./PagesLogin";

export const Onboarding = ({ startingScreenHandler }) => {
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };
  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor="#018749"
            iconName="currency-usd"
            title="Welcome to MoneyIO 🤓"
          >
            <Footer
              rightButtonLabel={"next"}
              rightButtonPress={() => {
                handlePageChange(1);
              }}
            ></Footer>
          </Page>
        </View>

        <View key="2">
          <Page
            backgroundColor="#07689f"
            iconName="credit-card-outline"
            title="We keep track of all your payments =) "
          >
            <Footer
              rightButtonLabel={"next"}
              rightButtonPress={() => {
                handlePageChange(2);
              }}
              leftButtonLabel={"back"}
              leftButtonPress={() => handlePageChange(0)}
            ></Footer>
          </Page>
        </View>

        <View key="3">
          <Page
            backgroundColor="#FF6347"
            iconName="robot-happy-outline"
            title="*Promise we don't sell your data"
          >
            <Footer
              rightButtonLabel={"next"}
              rightButtonPress={() => {
                handlePageChange(3);
              }}
              leftButtonLabel={"back"}
              leftButtonPress={() => handlePageChange(1)}
            ></Footer>
          </Page>
        </View>

        <View key="4">
          <PageLogin
            backgroundColor="#07689f"
            iconName="account-arrow-up-outline"
            title="Get started by creating an account 
                        （っ＾▿＾）"
            startingScreenHandler={startingScreenHandler}
          >
            <Footer
              rightButtonLabel={"skip"}
              rightButtonPress={startingScreenHandler}
              leftButtonLabel={"back"}
              leftButtonPress={() => handlePageChange(2)}
            ></Footer>
          </PageLogin>
        </View>
      </ViewPager>
    </View>
  );
};

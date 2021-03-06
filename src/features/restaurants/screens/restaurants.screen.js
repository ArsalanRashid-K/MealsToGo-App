import React, { useContext, useState } from "react";
import { RestaurantInfoCard } from "../components/restaurants-info-card.components";
import { FlatList, TouchableOpacity } from "react-native";

import { FadeInView } from "../../../components/animations/fade.animation";

import { ActivityIndicator, Colors } from "react-native-paper";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/Utility/safe-area-component";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Search } from "../components/search.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FavouritesBar } from "../../../components/favourites/favourite-bar.component";

import { RestaurantList } from "../components/restaurant-list.styles";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  //  navigation is a prop from stack and only component that are on the restaurant screen can access it-// console.log(navigation);
  //  restaurantContext  this is used to access the provider
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}

      <RestaurantList
        // now the data is using the array from restaurantContext restaurant
        data={restaurants}
        // it does not matter what we name the data it is just there for how many times it shows on the screen
        renderItem={({ item }) => {
          // console.log(item);
          return (
            // when we click any where on the restarunt screen . we will be naviagted to RestaurantDetail .
            //  we wrapped everything in restaurant StackNavigator- which provides a context which can be accessed within a tree
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
        //  the data { fe: 1 } and item should be same {(item) => item.fe}

        contentContainerStyle={{ padding: 16 }}
        // contentContainerStyle-> applied to the scroll view content container which wraps all of the child views.
      />
    </SafeArea>
  );
};

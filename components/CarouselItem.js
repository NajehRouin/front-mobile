const { View, Image, Text, StyleSheet, Dimensions } = require("react-native");

// responsivity unite
const unite = Dimensions.get("screen").width / 100;

const CarasoulItem = ({title, description, image}) => {
    return (
      <View
        style={{
          alignItems: "center",
          paddingTop: unite * 15,
          paddingHorizontal: unite * 5,
          width: unite * 100,
        }}
      >
        <Image
          source={image}
          style={styles.image}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
            {description}
        </Text>
      </View>
    );
  };
  

  const styles=new StyleSheet.create({
    image: {
        width: unite * 55,
        resizeMode: "contain",
        height: unite * 45,
        marginBottom: 50,
      },
      title: {
        fontSize: 30,
        fontWeight: "500",
        marginBottom: "10%",
        fontFamily: "ConcertOne-Regular",
      },
      description: {
        textAlign: "center",
        lineHeight: 25,
        marginBottom: "20%",
        fontFamily: "Inter-Regular",
        width: unite * 70,
      }
  })

  export default CarasoulItem;
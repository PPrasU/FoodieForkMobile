import { StyleSheet, View,Text } from "react-native";
import React, { useState } from "react";
import { SearchContainer } from "../../components";
import { ArrowRotateLeft, ArrowUp } from 'iconsax-react-native'

const Search = () => {
  const [cari, setCari] = useState("");
  const [histori, setHistori] = useState([]);

  const handleSearch = (text) => {
    setCari(text);
  };

  const handleHistoryClick = (text) => {
    setCari(text);
  };

  const handleSearchIconClick = () => {
    if (cari.trim() !== "") {
      setHistori([...histori, cari]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchContainer
          cari={cari}
          setCari={handleSearch}
          onSearchIconClick={handleSearchIconClick}
        />
      </View>
      <View style={styles.histori}>
        {histori.map((text) => (
          <View key={text} style={styles.historyItem}>
            <ArrowRotateLeft size={18} color="#aaa" />
            <Text style={styles.historyText}>{text}</Text>
            <ArrowUp size={18} color="#aaa" onPress={() => handleHistoryClick(text)} style={{ transform: [{ rotate: "-45deg" }]}}/>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 12,
    alignItems: "center",
    height: 60,
    paddingTop: 8,
    paddingBottom: 4,
    position: "absolute",
    top: 0,
    zIndex: 1000,
    right: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  histori: {
    paddingHorizontal: 12,
    marginTop: 65,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  historyText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
    color: "#aaa",
  },
});

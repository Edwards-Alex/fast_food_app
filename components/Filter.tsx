import { Category } from '@/type';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

const Filter = ({categories}:{categories: Category[]}) => {

  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.Category || '');

  const handlePresss = (id:string) => {

  }

  const filterData: (Category | {$id:string; name:string})[]=categories
  ?[{$id:'all', name:'All'},...categories]
  :[{$id: 'all', name:'All'}]

  return (
   <FlatList 
    data={filterData} 
    keyExtractor={(item)=> item.$id}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({item})=>(
      <TouchableOpacity>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )}
    />
  )
}

export default Filter
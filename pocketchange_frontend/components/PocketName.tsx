import { Text } from "react-native";
import { usePocketQuery } from "../hooks-apollo";
import { QueryResult } from "./QueryResult";


export function PocketName({ pocketID, style }: { pocketID: string, style: any }) {

  const { data: pocketData, loading: pocketLoading, error: pocketError } = usePocketQuery(pocketID);

  return (
    <QueryResult
      loading={pocketLoading}
      error={pocketError}
      data={pocketData}
    >
      <Text style={style}>
        {pocketData?.pocket?.businessName}
      </Text>
        </QueryResult>
    );
}
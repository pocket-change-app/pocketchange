import { Text } from "react-native";
import { useBusinessQuery } from "../hooks-apollo";
import { QueryResult } from "./QueryResult";


export function BusinessName({ businessID, style }: { businessID: string, style: any }) {

    const { data: businessData, loading: businessLoading, error: businessError } = useBusinessQuery(businessID);

    return(
      <QueryResult
        loading={businessLoading}
        error={businessError}
        data={businessData}
        indicatorSize={'small'}
      >
        <Text style={style}>
          {businessData?.business?.businessName}
        </Text>
      </QueryResult>
    );
}
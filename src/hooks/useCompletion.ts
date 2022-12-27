import {Configuration, CreateCompletionResponse, OpenAIApi} from 'openai';
import * as React from 'react';
import {CreateCompletionRequest} from 'openai/dist/api';
import {useDeepCompareMemo} from 'use-deep-compare';

type State = {
  readonly completion: CreateCompletionResponse | null;
  readonly loading: boolean;
  readonly error?: Error;
};

export default function useCompletion({
  apiKey,
  ...maybeRequest
}: CreateCompletionRequest & {
  readonly apiKey: string;
}): State {

  const request = useDeepCompareMemo(() => maybeRequest, [maybeRequest]);

  const shouldSkip = typeof request.prompt !== 'string' || !request.prompt.length;

  const [state, setState] = React.useState<State>({
    completion: null,
    loading: !shouldSkip,
  });

  React.useEffect(() => void (async () => {
    if (shouldSkip) return;

    setState(e => ({...e, loading: true, error: undefined}));

    try {

      const openai = new OpenAIApi(new Configuration({ apiKey }));

      const {data: completion} = await openai.createCompletion(request);

      setState(state => ({...state, loading: false, completion}));

    } catch (error) {
      setState(state => ({
        ...state,
        loading: false,
        // @ts-expect-error axios-style errors
        error: new Error(String(error?.response?.data || error?.message || error)),
      }));

    }

  })(), [request, shouldSkip, apiKey]);

  return state;
}

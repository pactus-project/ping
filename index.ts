import { GetBlockHashRequest, GetBlockHashResponse } from 'pactus-grpc/blockchain_pb';
import { BlockchainClient } from 'pactus-grpc/blockchain_grpc_web_pb';
import { PactusOpenRPC, Options } from 'pactus-jsonrpc';

export function callGrpcWeb(address: string, blockHeight: number): Promise<GetBlockHashResponse> {
  return new Promise((resolve, reject) => {
    const client = new BlockchainClient(address, null, null);
    const request = new GetBlockHashRequest();
    request.setHeight(blockHeight);

    client.getBlockHash(request, {}, (err, res) => {
      if (err) {
        reject(err);
      } else if (res) {
        resolve(res);
      } else {
        reject(new Error('Empty response'));
      }
    });
  });
}

export async function callJsonrpc(
    type: Options['transport']['type'],
    addr: string,
    port: number,
    blockHeight: number
): Promise<any> {
  const opts: Options = {
    transport: {
      type,
      host: addr,
      port,
    },
  };

  const client = new PactusOpenRPC(opts);

  try {
    const res = await client.pactusBlockchainGetBlockHash(blockHeight);
    return res;
  } catch (err) {
    throw err;
  }
}


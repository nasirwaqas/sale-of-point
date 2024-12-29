import { gql } from '@apollo/client';

// ==============> LOGIN <================
export const SAVE_TRADOS_ID = gql`
query SaveTradosId($fileUrl:String,$barzanoId:String, $workflowId:String, $projectId:String,$lang:String, $token:String){
  saveTradoProjectId(fileUrl:$fileUrl,barzanoId:$barzanoId, workflowId:$workflowId, projectId:$projectId,lang:$lang, token:$token)
}
`
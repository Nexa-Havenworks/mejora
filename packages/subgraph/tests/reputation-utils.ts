import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  GroupAdminUpdated,
  GroupCreated,
  MemberAdded,
  MemberRemoved,
  NullifierHashAdded,
  ProofVerified
} from "../generated/Reputation/Reputation"

export function createGroupAdminUpdatedEvent(
  groupId: BigInt,
  oldAdmin: Address,
  newAdmin: Address
): GroupAdminUpdated {
  let groupAdminUpdatedEvent = changetype<GroupAdminUpdated>(newMockEvent())

  groupAdminUpdatedEvent.parameters = new Array()

  groupAdminUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  groupAdminUpdatedEvent.parameters.push(
    new ethereum.EventParam("oldAdmin", ethereum.Value.fromAddress(oldAdmin))
  )
  groupAdminUpdatedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return groupAdminUpdatedEvent
}

export function createGroupCreatedEvent(
  groupId: BigInt,
  depth: i32,
  zeroValue: BigInt
): GroupCreated {
  let groupCreatedEvent = changetype<GroupCreated>(newMockEvent())

  groupCreatedEvent.parameters = new Array()

  groupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  groupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "depth",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(depth))
    )
  )
  groupCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "zeroValue",
      ethereum.Value.fromUnsignedBigInt(zeroValue)
    )
  )

  return groupCreatedEvent
}

export function createMemberAddedEvent(
  groupId: BigInt,
  identityCommitment: BigInt,
  root: BigInt
): MemberAdded {
  let memberAddedEvent = changetype<MemberAdded>(newMockEvent())

  memberAddedEvent.parameters = new Array()

  memberAddedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  memberAddedEvent.parameters.push(
    new ethereum.EventParam(
      "identityCommitment",
      ethereum.Value.fromUnsignedBigInt(identityCommitment)
    )
  )
  memberAddedEvent.parameters.push(
    new ethereum.EventParam("root", ethereum.Value.fromUnsignedBigInt(root))
  )

  return memberAddedEvent
}

export function createMemberRemovedEvent(
  groupId: BigInt,
  identityCommitment: BigInt,
  root: BigInt
): MemberRemoved {
  let memberRemovedEvent = changetype<MemberRemoved>(newMockEvent())

  memberRemovedEvent.parameters = new Array()

  memberRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  memberRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "identityCommitment",
      ethereum.Value.fromUnsignedBigInt(identityCommitment)
    )
  )
  memberRemovedEvent.parameters.push(
    new ethereum.EventParam("root", ethereum.Value.fromUnsignedBigInt(root))
  )

  return memberRemovedEvent
}

export function createNullifierHashAddedEvent(
  nullifierHash: BigInt
): NullifierHashAdded {
  let nullifierHashAddedEvent = changetype<NullifierHashAdded>(newMockEvent())

  nullifierHashAddedEvent.parameters = new Array()

  nullifierHashAddedEvent.parameters.push(
    new ethereum.EventParam(
      "nullifierHash",
      ethereum.Value.fromUnsignedBigInt(nullifierHash)
    )
  )

  return nullifierHashAddedEvent
}

export function createProofVerifiedEvent(
  groupId: BigInt,
  signal: Bytes
): ProofVerified {
  let proofVerifiedEvent = changetype<ProofVerified>(newMockEvent())

  proofVerifiedEvent.parameters = new Array()

  proofVerifiedEvent.parameters.push(
    new ethereum.EventParam(
      "groupId",
      ethereum.Value.fromUnsignedBigInt(groupId)
    )
  )
  proofVerifiedEvent.parameters.push(
    new ethereum.EventParam("signal", ethereum.Value.fromFixedBytes(signal))
  )

  return proofVerifiedEvent
}

import { supabase } from '../utils/supabaseClient'
import type { Tables, TablesInsert } from '../types/supabase'

export async function getMyProfile() {
  if (!supabase) throw new Error('Supabase not configured')
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  if (error) throw error
  return data as Tables<'profiles'>
}

export async function createPersona(input: TablesInsert<'personas'>) {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('personas')
    .insert(input)
    .select('*')
    .single()
  if (error) throw new Error(error.message)
  return data as Tables<'personas'>
}

export async function listMyPersonas() {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('personas')
    .select('*')
  if (error) throw new Error(error.message)
  return data as Tables<'personas'>[]
}

export async function getCurrentUserId() {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase.auth.getUser()
  if (error) throw new Error(error.message)
  return data.user?.id ?? null
}

export async function listMyMemberships() {
  const userId = await getCurrentUserId()
  if (!userId) return [] as Tables<'persona_memberships'>[]
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('persona_memberships')
    .select('*')
    .eq('user_id', userId)
  if (error) throw new Error(error.message)
  return data as Tables<'persona_memberships'>[]
}

export async function createInvite(input: TablesInsert<'persona_invites'>) {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase
    .from('persona_invites')
    .insert(input)
    .select('*')
    .single()
  if (error) throw error
  return data as Tables<'persona_invites'>
}

export async function uploadPersonaMedia(params: { personaId: string; file: File; path?: string }) {
  if (!supabase) throw new Error('Supabase not configured')
  const path = params.path ?? `${params.personaId}/${crypto.randomUUID()}-${params.file.name}`
  const { error } = await supabase.storage.from('persona-media').upload(path, params.file, { upsert: false })
  if (error) throw error
  // Bucket is private; return a short-lived signed URL for immediate preview
  const { data: signed } = await supabase.storage.from('persona-media').createSignedUrl(path, 60 * 60)
  return { path, signedUrl: signed?.signedUrl }
}

export async function deletePersonaAndMemberships(personaId: string) {
  if (!supabase) throw new Error('Supabase not configured')
  // Best-effort clean up dependent rows before deleting persona
  // RLS must allow owner to delete these rows
  await supabase.from('persona_invites').delete().eq('persona_id', personaId)
  await supabase.from('persona_memberships').delete().eq('persona_id', personaId)
  const { error } = await supabase.from('personas').delete().eq('id', personaId)
  if (error) throw new Error(error.message)
}



import { Injectable } from "@angular/core";
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
} from "@supabase/supabase-js";
import { environment } from "../../src/environments/environment.development";
import { Router } from "@angular/router";

type HTTP_METHODS = "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
export interface Profile {
    id?: string;
    username: string;
    website: string;
    avatar_url: string;
}

@Injectable({
    providedIn: "root",
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor(private router: Router) {
        this.supabase = createClient(
            environment.supabaseUrl,
            environment.supabaseKey,
        );
    }

    async getSession() {
        const { data, error } = await this.supabase.auth.getSession();
        if (error) {
            console.error(error);
            return null;
        }
        return data;
    }

    profile(user: User) {
        return this.supabase
            .from("profiles")
            .select(`username, website, avatar_url`)
            .eq("id", user.id)
            .single();
    }

    authChanges(
        callback: (event: AuthChangeEvent, session: Session | null) => void,
    ) {
        return this.supabase.auth.onAuthStateChange(callback);
    }

    signIn(email: string) {
        return this.supabase.auth.signInWithOtp({ email });
    }

    signOut() {
        return this.supabase.auth.signOut().then(() => this.router.navigate([""]));
    }

    updateProfile(profile: Profile) {
        const update = {
            ...profile,
            updated_at: new Date(),
        };

        return this.supabase.from("profiles").upsert(update);
    }

    downLoadImage(path: string) {
        return this.supabase.storage.from("avatars").download(path);
    }

    uploadAvatar(filePath: string, file: File) {
        return this.supabase.storage.from("avatars").upload(filePath, file);
    }

    listenToChannelMessage(
        channelName: string,
        callback: (payload: {
            [key: string]: any;
            type: "broadcast";
            event: string;
        }) => any,
    ) {
        const channel = this.supabase.channel("token");
        channel.on(
            "broadcast",
            { event: "test" },
            (payload) => callback(payload),
        ).subscribe();
    }

    async invokeFunction(functionName: string, body: Record<string,any>, method: HTTP_METHODS = 'POST') {
        try {
            return await this.supabase.functions.invoke(functionName, {
                method: 'POST',
                body
            });
        } catch (e) {
            console.error('error');
            return null;
        }
    }
}
